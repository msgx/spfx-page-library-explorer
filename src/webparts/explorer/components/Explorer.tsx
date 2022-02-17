import * as React from "react";
import * as strings from "ExplorerWebPartStrings";
import { Nav, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";
import { NavDataService } from "../services";
import { IExplorerProps } from "../models";
import styles from "./styles.module.scss";

export const Explorer: React.FC<IExplorerProps> = ({ termSetId, pageLibraryId, pageContentTypeId, taxonomyFieldName }: IExplorerProps) => {
	const [links, setLinks] = React.useState<INavLinkGroup[]>([]);

	React.useEffect(() => {
		NavDataService.getNavigation(termSetId).then(nav => setLinks(nav));
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
						<Nav groups={links} />
					</div>
				</div>
			</div>
		</div>
	);
};
