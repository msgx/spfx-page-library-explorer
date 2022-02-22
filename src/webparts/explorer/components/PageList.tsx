import * as React from "react";
import { Link } from "office-ui-fabric-react/lib/Link";
import { IPageListProps } from "../models";

export const PageList: React.FC<IPageListProps> = ({ pages }: IPageListProps) => {
	if (pages && pages.length) {
		return (
			<ul>
				{pages.map(p => (
					<li key={p.id}>
						<Link href={p.url}>{p.title}</Link>
					</li>
				))}
			</ul>
		);
	} else {
		return <div>No pages found.</div>;
	}
};
