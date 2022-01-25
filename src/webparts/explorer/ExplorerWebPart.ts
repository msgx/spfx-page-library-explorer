import * as React from "react";
import * as ReactDom from "react-dom";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { Explorer } from "./components/Explorer";

export default class ExplorerWebPart extends BaseClientSideWebPart<undefined> {
	public render(): void {
		const element: React.ReactElement = React.createElement(Explorer, { context: this.context });
		ReactDom.render(element, this.domElement);
	}

	// protected async onInit(): Promise<void> {}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}
}
