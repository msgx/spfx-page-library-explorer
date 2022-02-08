import * as React from "react";
import * as strings from "ExplorerWebPartStrings";
import { IExplorerProps } from "../models";
import styles from "./styles.module.scss";

export const Explorer: React.FC<IExplorerProps> = ({ pageLibraryId, pageContentTypeId, taxonomyFieldName }: IExplorerProps) => (
	<div className={styles.explorer}>
		<h1 className={styles.title}>{strings.webPartTitle}</h1>
		<div className={styles.grid} dir="ltr">
			<div className={styles.row}>
				<div className={styles.column}>
					<p>
						<b>Library:</b> <span>{String(pageLibraryId)}</span>
					</p>
					<p>
						<b>Content type:</b> <span>{String(pageContentTypeId) || "(empty)"}</span>
					</p>
					<p>
						<b>Taxonomy field:</b> <span>{String(taxonomyFieldName) || "(empty)"}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
);
