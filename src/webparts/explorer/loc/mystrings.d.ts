declare interface IExplorerWebPartStrings {
	webPartTitle: string;
	genericErrorMessage: string;
	propertyPaneDescription: string;
	propertyPaneContentType: string;
	propertyPaneTaxonomyField: string;
	propertyPaneWarningMessage: string;
}

declare module "ExplorerWebPartStrings" {
	const strings: IExplorerWebPartStrings;
	export = strings;
}
