import * as React from "react";
import * as strings from "ExplorerWebPartStrings";
import { TreeView, ITreeItem, TreeViewSelectionMode } from "@pnp/spfx-controls-react/lib/TreeView";
import { NavDataService } from "../services";
import { IExplorerProps } from "../models";
import styles from "./styles.module.scss";

export const Explorer: React.FC<IExplorerProps> = ({ termSetId, pageLibraryId, pageContentTypeId, taxonomyFieldName }: IExplorerProps) => {
	const [items, setItems] = React.useState<ITreeItem[]>([]);

	React.useEffect(() => {
		NavDataService.getNavigation(termSetId).then(nav => setItems(nav));
	}, [termSetId]);

	return (
		<div className={styles.explorer}>
			<h1 className={styles.title}>{strings.webPartName}</h1>
			<div className={styles.grid} dir="ltr">
				<div className={styles.row}>
					<div className={styles.column}>
						<p>
							<b>Library:</b> <span>{String(pageLibraryId)}</span>
						</p>
						<p>
							<b>Content type:</b> <span>{String(pageContentTypeId)}</span>
						</p>
						<p>
							<b>Taxonomy field:</b> <span>{String(taxonomyFieldName)}</span>
						</p>
						<p>
							<b>Term set:</b> <span>{String(termSetId)}</span>
						</p>
						<TreeView items={items} showCheckboxes={false} defaultExpanded={false} selectionMode={TreeViewSelectionMode.Single} />
					</div>
				</div>
			</div>
		</div>
	);
};
