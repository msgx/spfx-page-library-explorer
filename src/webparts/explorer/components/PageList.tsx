import * as React from "react";
import { List } from "office-ui-fabric-react/lib/List";
import { PageItem } from "../components";
import { IPageListProps, IPageDetails } from "../models";
import styles from "./styles.module.scss";

export const PageList: React.FC<IPageListProps> = ({ title, pages }: IPageListProps) => {
	const renderPageItem = React.useCallback((item: IPageDetails) => <PageItem item={item} />, []);

	if (!title) {
		return <div className={styles.pages}>No item selected.</div>;
	}

	if (pages && pages.length) {
		return (
			<div className={styles.pages}>
				<List items={pages} onRenderCell={renderPageItem} />
			</div>
		);
	} else {
		return (
			<div className={styles.pages}>
				<span>No pages found.</span>
			</div>
		);
	}
};
