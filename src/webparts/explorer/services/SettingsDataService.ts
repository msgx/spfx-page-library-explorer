import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/fields/list";
import "@pnp/sp/content-types/list";
import { IPageContentType, ITaxonomyField } from "../models";

export class SettingsDataService {
	private static readonly PAGE_CONTENT_TYPE_ID: string = "0x0101009D1CB255DA76424F860D91F20E6C4118";

	/**
	 * Gets identifier of the Site Pages library
	 * @param context Wep part context
	 * @returns GUID of the library
	 */
	public static async getPageLibraryId(context: WebPartContext): Promise<string> {
		const library = await sp.web.getList(`${context.pageContext.web.serverRelativeUrl}/SitePages`).select("Id").usingCaching()();
		return library.Id;
	}

	/**
	 * Gets identifier of the term set assigned to the taxonomy field
	 * @param libraryId GUID of the library
	 * @param fieldName Internal name of the taxonomy field
	 * @returns GUID of the term set
	 */
	public static async getTaxonomyFieldTermSetId(libraryId: string, fieldName: string): Promise<string> {
		const field = await sp.web.lists.getById(libraryId).fields.getByInternalNameOrTitle(fieldName).select("TermSetId").usingCaching()();
		return field["TermSetId"] || null;
	}

	/**
	 * Loads page content types assigned to the library
	 * @param libraryId GUID of the library
	 * @returns Array of dropdown options
	 */
	public static async getPageContentTypes(libraryId: string): Promise<IPageContentType[]> {
		const contentTypes = await sp.web.lists
			.getById(libraryId)
			.contentTypes.filter(`startswith(StringId,'${this.PAGE_CONTENT_TYPE_ID}')`)
			.select("StringId", "Name")
			.usingCaching()();
		return contentTypes.map<IPageContentType>(ct => ({ id: ct.StringId, title: ct.Name }));
	}

	/**
	 * Loads managed metadata fields from the content type assigned to the library
	 * @param libraryId GUID of the library
	 * @param contentTypeId ID of the content type
	 * @returns Array of dropdown options
	 */
	public static async getTaxonomyFields(libraryId: string, contentTypeId: string): Promise<ITaxonomyField[]> {
		const fields = await sp.web.lists
			.getById(libraryId)
			.contentTypes.getById(contentTypeId)
			.fields.filter("startswith(TypeAsString,'TaxonomyFieldType')")
			.select("InternalName,Title,TermSetId")
			.usingCaching()();
		return fields.map<ITaxonomyField>(f => ({ name: f.InternalName, title: f.Title, termSetId: f.TermSetId }));
	}
}
