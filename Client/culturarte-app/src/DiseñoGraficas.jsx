import React from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Chart } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DiseñoGraficas() {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
            },
        },
    };

    const labels = ['Tier 1', 'Tier 2', 'Tier 3'];

    const data = {
        labels,
        datasets: [
            {
                label: 'cantidad de tickets',
                data: [100, 50, 25],
                backgroundColor: '#0E7BAA',
            },
            {
                label: 'cantidad de ventas',
                data: [80, 25, 15],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    return(
        <div className='w-1/2'>
            <h1 class="text-blue font-medium text-xl mb-4">Tiers</h1>
            <Bar options={options} data={data} />
        </div>
    );
}

export default DiseñoGraficas;