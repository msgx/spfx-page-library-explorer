import * as React from "react";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { TreeView, ITreeItem, TreeViewSelectionMode } from "@pnp/spfx-controls-react/lib/TreeView";
import { PageList } from "../components";
import { NavDataService } from "../services";
import { IExplorerProps, IPageDetails } from "../models";
import styles from "./styles.module.scss";

export const Explorer: React.FC<IExplorerProps> = ({ title, termSetId, pageLibraryId, pageContentTypeId, taxonomyFieldName }: IExplorerProps) => {
	const [navItems, setNavItems] = React.useState<ITreeItem[]>([]);
	const [selected, setSelected] = React.useState<ITreeItem>(null);
	const [pages, setPages] = React.useState<IPageDetails[]>([]);

	React.useEffect(() => {
		NavDataService.getNavigation(termSetId).then(nav => setNavItems(nav));
	}, [termSetId]);

	const selectNavItem = React.useCallback(async (items: ITreeItem[]) => {
		const item = items && items.length ? items[0] : null;
		const showPages = item ? await NavDataService.getPages(pageLibraryId, item.key) : [];
		setSelected(item);
		setPages(showPages);
	}, []);

	return (
		<div className={styles.explorer}>
			{Boolean(title) && <h1 className={styles.title}>{title}</h1>}
			<Stack horizontal>
				<Stack.Item grow={1}>
					<TreeView items={navItems} onSelect={selectNavItem} showCheckboxes={false} selectionMode={TreeViewSelectionMode.Single} />
				</Stack.Item>
				<Stack.Item grow={4}>{selected ? <PageList pages={pages} title={selected.label} /> : <div>No item selected.</div>}</Stack.Item>
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
