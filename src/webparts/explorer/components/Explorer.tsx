import * as React from "react";
import * as strings from "ExplorerWebPartStrings";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { TreeView, ITreeItem, TreeViewSelectionMode } from "@pnp/spfx-controls-react/lib/TreeView";
import { PageList } from "../components";
import { NavDataService } from "../services";
import { IExplorerProps, IPageList } from "../models";
import styles from "./styles.module.scss";

export const Explorer: React.FC<IExplorerProps> = ({ termSetId, pageLibraryId, pageContentTypeId, taxonomyFieldName }: IExplorerProps) => {
	const emptyList: IPageList = { title: null, pages: [] };
	const [navItems, setNavItems] = React.useState<ITreeItem[]>([]);
	const [pageList, setPageList] = React.useState<IPageList>(emptyList);

	React.useEffect(() => {
		NavDataService.getNavigation(termSetId).then(nav => setNavItems(nav));
	}, [termSetId]);

	const onItemSelect = React.useCallback(async (items: ITreeItem[]) => {
		const item = items && items.length ? items[0] : null;
		if (item) {
			const showPages = await NavDataService.getPages(pageLibraryId, item.key);
			setPageList({ title: item.label, pages: showPages });
		} else {
			setPageList(emptyList);
		}
	}, []);

	return (
		<div className={styles.explorer}>
			<h1 className={styles.title}>{strings.webPartName}</h1>
			<Stack horizontal>
				<Stack.Item grow={1}>
					<TreeView items={navItems} onSelect={onItemSelect} showCheckboxes={false} selectionMode={TreeViewSelectionMode.Single} />
				</Stack.Item>
				<Stack.Item grow={4}>
					<PageList title={pageList.title} pages={pageList.pages} />
				</Stack.Item>
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
