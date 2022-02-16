import * as React from "react";
import * as strings from "ExplorerWebPartStrings";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { IStubProps } from "../models";
import styles from "./styles.module.scss";

export const Stub: React.FC<IStubProps> = ({ isEditMode, onConfigure }: IStubProps) => (
	<div className={styles.stub}>
		<Stack verticalFill tokens={{ childrenGap: 12 }}>
			<div className={styles.head}>
				<Icon iconName="AlertSettings" className={styles.icon} />
				<span>{strings.webPartName}</span>
			</div>
			<div className={styles.info}>
				{strings.stubNotConfiguredText}
				<br />
				{strings.stubInstructionsText}
			</div>
			{isEditMode && (
				<div className={styles.info}>
					<PrimaryButton text={strings.stubConfigureButtonText} onClick={onConfigure} />
				</div>
			)}
		</Stack>
	</div>
);
