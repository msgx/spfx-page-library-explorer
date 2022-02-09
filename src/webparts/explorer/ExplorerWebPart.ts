import * as React from "react";
import * as ReactDom from "react-dom";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import {
	IPropertyPaneConfiguration,
	IPropertyPaneDropdownOption,
	IPropertyPaneField,
	PropertyPaneDropdown,
	PropertyPaneLabel
} from "@microsoft/sp-property-pane";
import { sp } from "@pnp/sp";
import { Logger, LogLevel, ConsoleListener } from "@pnp/logging";

import { Explorer } from "./components";
import { SettingsDataService } from "./services";
import { IExplorerWebPartProperties, ISettingsState } from "./models";
import * as strings from "ExplorerWebPartStrings";

export default class ExplorerWebPart extends BaseClientSideWebPart<IExplorerWebPartProperties> {
	private pageLibraryId: string;
	private contentTypes: IPropertyPaneDropdownOption[];
	private taxonomyFields: IPropertyPaneDropdownOption[];
	private settingsState: ISettingsState;

	constructor() {
		super();
		this.contentTypes = [];
		this.taxonomyFields = [];
		this.settingsState = { isLoading: false, hasError: false };
	}

	protected async onInit(): Promise<void> {
		sp.setup(this.context);
		Logger.activeLogLevel = LogLevel.Warning;
		Logger.subscribe(new ConsoleListener());
		this.pageLibraryId = await SettingsDataService.getPageLibraryId(this.context);
	}

	public render(): void {
		const element: React.ReactElement = React.createElement(Explorer, {
			pageLibraryId: this.pageLibraryId,
			pageContentTypeId: this.properties.pageContentTypeId,
			taxonomyFieldName: this.properties.taxonomyFieldName
		});
		ReactDom.render(element, this.domElement);
	}

	protected async onPropertyPaneConfigurationStart(): Promise<void> {
		if (!this.contentTypes.length) {
			await this.loadContentTypes();
		}
		if (this.properties.pageContentTypeId && !this.taxonomyFields.length) {
			await this.loadFields(this.properties.pageContentTypeId);
		}
	}

	protected async onPropertyPaneFieldChanged(propertyPath: string, oldValue: unknown, newValue: unknown): Promise<void> {
		if (propertyPath === "pageContentTypeId" && newValue != oldValue) {
			this.taxonomyFields = [];
			this.properties.taxonomyFieldName = null;
			await this.loadFields(newValue as string);
		}
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		const fields: IPropertyPaneField<unknown>[] = [];
		if (this.settingsState.hasError) {
			fields.push(PropertyPaneLabel(null, { text: this.settingsState.errorMessage || strings.genericErrorMessage }));
		} else {
			fields.push(
				PropertyPaneDropdown("pageContentTypeId", {
					options: this.contentTypes,
					label: strings.propertyPaneContentType
				})
			);
			if (this.taxonomyFields.length) {
				fields.push(
					PropertyPaneDropdown("taxonomyFieldName", {
						options: this.taxonomyFields,
						label: strings.propertyPaneTaxonomyField
					})
				);
			} else if (this.properties.pageContentTypeId && !this.settingsState.isLoading) {
				fields.push(PropertyPaneLabel(null, { text: strings.propertyPaneWarningMessage, required: true }));
			}
		}
		return {
			showLoadingIndicator: this.settingsState.isLoading,
			loadingIndicatorDelayTime: 100,
			pages: [
				{
					header: { description: strings.propertyPaneDescription },
					groups: [{ groupFields: fields }]
				}
			]
		};
	}

	protected get disableReactivePropertyChanges(): boolean {
		return true;
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	private async loadContentTypes(): Promise<void> {
		this.setPropertyPaneLoading(true);
		try {
			const contentTypes = await SettingsDataService.getPageContentTypes(this.pageLibraryId);
			this.contentTypes = contentTypes
				.map<IPropertyPaneDropdownOption>(ct => ({ key: ct.id, text: ct.title }))
				.sort(this.dropdownOptionComparator);
		} catch (error) {
			this.settingsState.hasError = true;
			this.settingsState.errorMessage = error.message;
			Logger.error(error);
		}
		this.setPropertyPaneLoading(false);
	}

	private async loadFields(contentTypeId: string): Promise<void> {
		this.setPropertyPaneLoading(true);
		try {
			const taxonomyFields = await SettingsDataService.getTaxonomyFields(this.pageLibraryId, contentTypeId);
			this.taxonomyFields = taxonomyFields
				.map<IPropertyPaneDropdownOption>(f => ({ key: f.name, text: f.title }))
				.sort(this.dropdownOptionComparator);
		} catch (error) {
			this.settingsState.hasError = true;
			this.settingsState.errorMessage = error.message;
			Logger.error(error);
		}
		this.setPropertyPaneLoading(false);
	}

	private setPropertyPaneLoading(isLoading: boolean): void {
		this.settingsState.isLoading = isLoading;
		this.context.propertyPane.refresh();
	}

	private dropdownOptionComparator(a: IPropertyPaneDropdownOption, b: IPropertyPaneDropdownOption): number {
		const tA = a.text.toLowerCase();
		const tB = b.text.toLowerCase();
		return tA > tB ? 1 : tB > tA ? -1 : 0;
	}
}
