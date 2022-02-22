import { sp } from "@pnp/sp";
import "@pnp/sp/taxonomy";
import "@pnp/sp/items/list";
import { IOrderedTermInfo } from "@pnp/sp/taxonomy";
import { ITreeItem } from "@pnp/spfx-controls-react/lib/TreeView";
import { IPageDetails } from "../models";

function toTreeItem(term: IOrderedTermInfo): ITreeItem {
	const item: ITreeItem = { key: term.id, label: term.defaultLabel };
	if (term.childrenCount > 0) {
		item.children = term.children.map<ITreeItem>(t => toTreeItem(t));
	}
	return item;
}

export class NavDataService {
	public static async getNavigation(termSetId: string): Promise<ITreeItem[]> {
		// TODO: cache terms
		const terms = await sp.termStore.sets.getById(termSetId).getAllChildrenAsOrderedTree();
		return terms.map<ITreeItem>(t => toTreeItem(t));
	}

	public static async getPages(libraryId: string, termId: string): Promise<IPageDetails[]> {
		// TODO: also filter by FileDirRef to exclude page templates, e.g. ... and FileDirRef ne '/sites/kb/SitePages/Templates'
		// TODO: also filter by ContentTypeId
		const items = await sp.web.lists
			.getById(libraryId)
			.items.filter(`TaxCatchAll/IdForTerm eq '${termId}'`)
			.select("Id", "Title", "FileRef", "FileLeafRef")
			.usingCaching()();
		return items.map<IPageDetails>(i => ({
			id: i.Id,
			url: i.FileRef,
			title: i.Title,
			filename: i.FileLeafRef
		}));
	}
}
