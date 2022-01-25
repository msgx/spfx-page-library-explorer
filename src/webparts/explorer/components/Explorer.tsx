import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import * as strings from "ExplorerWebPartStrings";
import styles from "./styles.module.scss";

export interface IExplorerProps {
	context: WebPartContext;
}

export const Explorer: React.FC<IExplorerProps> = ({ context }: IExplorerProps) => (
	<div className={styles.explorer}>
		<h1 className={styles.title}>{strings.webPartTitle}</h1>
		<div className={styles.grid} dir="ltr">
			<div className={styles.row}>
				<div className={styles.column}> {`Welcome to '${context.pageContext.web.title}'!`} </div>
			</div>
		</div>
	</div>
);
