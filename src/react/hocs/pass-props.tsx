import {createHoc} from './create-hoc.util';
import React, {ComponentType, PropsWithChildren} from 'react';
import {SubtractType} from '../../general/utility-types';

type WithoutProps<C extends ComponentType<any>> = {
    [K in keyof C]: C[K];
};

export type PassPropsHoc<C extends ComponentType<P>, P extends PropsWithChildren<any>, NP> =
    WithoutProps<C>
    & ComponentType<SubtractType<P, NP>>;

export function passProps<C extends ComponentType<P>, P extends PropsWithChildren<any>, NP>(
    newProps: () => NP,
    Component: C & ComponentType<P>)
    : PassPropsHoc<C, P, NP>
{
    return createHoc<C, P, PassPropsHoc<C, P, NP>>(
        'PassProps',
        Component,
        (props: P) => {
            const additionalProps = newProps();

            // @ts-ignore
            return (<Component {...props} {...additionalProps}/>);
        }
    );
}
