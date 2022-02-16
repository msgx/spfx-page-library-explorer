export interface IExplorerWebPartProperties {
	pageContentTypeId: string;
	taxonomyFieldName: string;
}

export interface IExplorerProps {
	termSetId: string;
	pageLibraryId: string;
	pageContentTypeId: string;
	taxonomyFieldName: string;
}

export interface IStubProps {
	isEditMode: boolean;
	onConfigure(): void;
}

export interface IPageContentType {
	id: string;
	title: string;
}

export interface ITaxonomyField {
	name: string;
	title: string;
	termSetId: string;
}

export interface ISettingsState {
	isLoading: boolean;
	hasError: boolean;
	errorMessage?: string;
}

export interface IHash<T> {
	[key: string]: T;
}
