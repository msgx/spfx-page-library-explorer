export interface IExplorerWebPartProperties {
	pageContentTypeId: string;
	taxonomyFieldName: string;
}

export interface IExplorerProps {
	pageLibraryId: string;
	pageContentTypeId: string;
	taxonomyFieldName: string;
}

export interface IPageContentType {
	id: string;
	title: string;
}

export interface ITaxonomyField {
	name: string;
	title: string;
}

export interface ISettingsState {
	isLoading: boolean;
	hasError: boolean;
	errorMessage?: string;
}
