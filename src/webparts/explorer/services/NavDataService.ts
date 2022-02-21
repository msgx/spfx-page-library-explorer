import { sp } from "@pnp/sp";
import "@pnp/sp/taxonomy";
import { IOrderedTermInfo } from "@pnp/sp/taxonomy";
import { ITreeItem } from "@pnp/spfx-controls-react/lib/TreeView";

function toTreeItem(term: IOrderedTermInfo): ITreeItem {
	const item: ITreeItem = { key: term.id, label: term.defaultLabel };
	if (term.childrenCount > 0) {
		item.children = term.children.map<ITreeItem>(t => toTreeItem(t));
	}
	return item;
}

export class NavDataService {
	public static async getNavigation(termSetId: string): Promise<ITreeItem[]> {
		// TODO: cache terms
		const terms = await sp.termStore.sets.getById(termSetId).getAllChildrenAsOrderedTree();
		return terms.map<ITreeItem>(t => toTreeItem(t));
	}
}
