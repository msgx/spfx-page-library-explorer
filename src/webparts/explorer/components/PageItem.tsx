import * as React from "react";
import { Link } from "office-ui-fabric-react/lib/Link";
import { IPageItemProps } from "../models";
import styles from "./styles.module.scss";

export const PageItem: React.FC<IPageItemProps> = ({ item }: IPageItemProps) => (
	<div key={item.id} className={styles.gridRow}>
		<div className={styles.gridCell}>
			<img src="https://static2.sharepointonline.com/files/fabric/assets/item-types/20/spo.svg" width="20" height="20" />
		</div>
		<div className={styles.gridCell}>
			<Link href={item.url}>{item.title}</Link>
		</div>
	</div>
);
