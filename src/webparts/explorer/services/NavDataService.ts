import { sp } from "@pnp/sp";
import "@pnp/sp/taxonomy";
import { IOrderedTermInfo } from "@pnp/sp/taxonomy";
import { INavLink, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";

export class NavDataService {
	public static async getNavigation(termSetId: string): Promise<INavLinkGroup[]> {
		// TODO: cache terms
		const terms = await sp.termStore.sets.getById(termSetId).getAllChildrenAsOrderedTree();
		const links = terms.map<INavLink>(t => this.toNavLink(t));
		return [{ links }];
	}

	private static toNavLink(term: IOrderedTermInfo): INavLink {
		const link: INavLink = { key: term.id, name: term.defaultLabel, url: null };
		if (term.childrenCount > 0) {
			link.links = term.children.map<INavLink>(t => this.toNavLink(t));
		}
		return link;
	}
}
