import React, { PureComponent } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
} from 'recharts';

class AvaliacaoQualiGrafico extends PureComponent {
    render() {
        const { classificacoes } = this.props;
        const minimo = Math.min(...classificacoes);
        const maximo = classificacoes.length;
        const data = [
            {
                name: 'Classificação', nivel: [minimo, this.props.nivel]
            }
        ];
        return (
            <BarChart
                width={150}
                height={40}
                data={data}
                layout="vertical">
                <Tooltip wrapperStyle={{ zIndex: 9999 }} />
                <XAxis type="number" hide domain={[minimo, maximo]} />
                <YAxis type="category" hide dataKey="name" />
                <Bar background dataKey="nivel" fill="#8884d8" />
            </BarChart>
        );
    }
}
export default AvaliacaoQualiGrafico;