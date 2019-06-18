import classNames from 'classnames';
import * as React from 'react';
import { Theme } from '../../../common/components';
import './DescriptionList.scss';

export interface DescriptionListItem {
    title: string;
    value: string;
    extra?: string;
    theme?: Theme;
}

export interface DescriptionListProps {
    items: DescriptionListItem[];
    total?: DescriptionListItem;
}

// tslint:disable-next-line:variable-name
export const DescriptionList: React.FunctionComponent<DescriptionListProps> = (props) => {
    const items = props.items.map(item => renderItem(item, false));

    let total: React.ReactNode = null;

    if (props.total) {
        total = <React.Fragment>
            <hr />
            {renderItem(props.total, true)}
        </React.Fragment>;
    }

    return <div className='description-list'>
        {items}
        {total}
    </div>;
};

const renderItem = (item: DescriptionListItem, total: boolean) => {
    const classes: Record<string, boolean> = {
        'description-list__item': true,
        'description-list__item--total': total,
    };

    if (item.theme) {
        classes[`description-list__item--${item.theme}`] = true;
    }

    const className = classNames(classes);

    return <div key={item.title} className={className} >
        <p className='description-list__item-title'>
            {item.title}
            {item.extra && <span>{item.extra}</span>}
        </p>
        <div className='description-list__item-value'>{item.value}</div>
    </div>;
};
