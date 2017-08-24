import * as React from 'react';

import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

interface propTypes {
    showPanel: boolean,
    openPanel: any,
    closePanel: any,
    formMarkup: any,
    displayText: any,
    handleSave: any
}

const SidePanel = ({ showPanel, openPanel, closePanel, formMarkup, displayText, handleSave }: propTypes) => (
    <div>
        <DefaultButton
            description='Opens the Sample Panel'
            onClick={() => openPanel()}
            text='Open Panel'
        />
        <Panel
            isOpen={showPanel}
            type={PanelType.medium}
            isLightDismiss={true}
            onDismiss={() => closePanel()}
            headerText={displayText}
            onRenderFooterContent={() => {
                return (
                    <div>
                        <PrimaryButton
                            onClick={() => handleSave()}
                            style={{ 'marginRight': '8px' }} >
                            Save
                        </PrimaryButton>
                        <DefaultButton onClick={() => closePanel()} >
                            Cancel
                        </DefaultButton>
                    </div>
                );
            }} >
            {formMarkup}
        </Panel>
    </div>
);

export default SidePanel;