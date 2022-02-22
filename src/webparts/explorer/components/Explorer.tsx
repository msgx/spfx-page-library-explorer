import * as React from "react";
import * as strings from "ExplorerWebPartStrings";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { TreeView, ITreeItem, TreeViewSelectionMode } from "@pnp/spfx-controls-react/lib/TreeView";
import { PageList } from "../components";
import { NavDataService } from "../services";
import { IExplorerProps, IPageDetails } from "../models";
import styles from "./styles.module.scss";

export const Explorer: React.FC<IExplorerProps> = ({ termSetId, pageLibraryId, pageContentTypeId, taxonomyFieldName }: IExplorerProps) => {
	const [navItems, setNavItems] = React.useState<ITreeItem[]>([]);
	const [pages, setPages] = React.useState<IPageDetails[]>([]);

	React.useEffect(() => {
		NavDataService.getNavigation(termSetId).then(nav => setNavItems(nav));
	}, [termSetId]);

	const onItemSelect = React.useCallback(async (items: ITreeItem[]) => {
		const item = items && items.length ? items[0] : null;
		if (item) {
			console.log(`selected: ${item.label} (${item.key})`);
			const showPages = await NavDataService.getPages(pageLibraryId, item.key);
			setPages(showPages);
		} else {
			console.log("no items selected");
			setPages([]);
		}
	}, []);

	return (
		<div className={styles.explorer}>
			<h1 className={styles.title}>{strings.webPartName}</h1>
			<Stack horizontal>
				<TreeView items={navItems} onSelect={onItemSelect} showCheckboxes={false} selectionMode={TreeViewSelectionMode.Single} />
				<PageList pages={pages} />
			</Stack>
			<div className={styles.debug}>
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
			</div>
		</div>
	);
};
