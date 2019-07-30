import autobind from "autobind-decorator";
import {CheckedSelect, Option} from "cbioportal-frontend-commons";
import {action, computed} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react';

import {DataFilter} from "../../model/DataFilter";

export type DropdownSelectorProps = {
    name?: string;
    placeholder?: string;
    onSelect?: (selectedOptionIds: string[]) => void;
    showControls?: boolean;
    filter?: DataFilter<string>;
    options?: {label?: string | JSX.Element, value: string}[];
};

@observer
export class DropdownSelector extends React.Component<DropdownSelectorProps, {}>
{
    @computed
    public get selectedValues() {
        return (this.props.options || [])
            .filter(option => !this.props.filter ||
                this.props.filter.values.find(
                    filterValue => option.value.toLowerCase() === filterValue.toLowerCase()))
            .map(option => ({value: option.value}));
    }

    @computed
    public get options(): Option[] {
        return (this.props.options || [])
            .map(option => ({label: <span>{option.label || option.value}</span>, value: option.value}));
    }

    public render()
    {
        return (
            <CheckedSelect
                name={this.props.name}
                placeholder={this.props.placeholder}
                onChange={this.onChange}
                options={this.options}
                value={this.selectedValues}
                showControls={this.props.showControls}
            />
        );
    }

    @autobind
    @action
    private onChange(values: Array<{value: string}>) {
        if (this.props.onSelect) {
            this.props.onSelect(values.map(o => o.value));
        }
    }
}

export default DropdownSelector;
