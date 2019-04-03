import { BarLoader } from 'react-spinners';
import { css } from '@emotion/core';

import React, { Component } from 'react';
const override = css`
    display: block;
    margin: 100px auto 0px auto;
`;

class Loading extends Component {
    render() {
        return (
            <BarLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={this.props.loading}
            />
        );
    }
}

export default Loading;