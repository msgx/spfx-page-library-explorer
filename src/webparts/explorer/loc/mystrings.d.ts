declare interface IExplorerWebPartStrings {
	webPartName: string;
	genericErrorMessage: string;
	stubConfigureButtonText: string;
	stubNotConfiguredText: string;
	stubInstructionsText: string;
	propertyPaneDescription: string;
	propertyPaneContentType: string;
	propertyPaneTaxonomyField: string;
	propertyPaneWarningMessage: string;
}

declare module "ExplorerWebPartStrings" {
	const strings: IExplorerWebPartStrings;
	export = strings;
}
