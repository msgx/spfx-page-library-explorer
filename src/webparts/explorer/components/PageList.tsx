import * as React from "react";
import { List } from "office-ui-fabric-react/lib/List";
import { PageItem } from "../components";
import { IPageListProps, IPageDetails } from "../models";
import styles from "./styles.module.scss";

export const PageList: React.FC<IPageListProps> = ({ title, pages }: IPageListProps) => {
	const renderPageItem = React.useCallback((item: IPageDetails) => <PageItem item={item} />, []);

	return (
		<div className={styles.pages}>
			<h2 className={styles.selected}>{title}</h2>
			{pages && pages.length ? <List items={pages} onRenderCell={renderPageItem} /> : <span>No pages found.</span>}
		</div>
	);
};
