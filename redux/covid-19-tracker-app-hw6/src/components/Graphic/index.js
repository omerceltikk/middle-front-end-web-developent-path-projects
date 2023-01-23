import React from 'react'
import { Container, Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Bar } from 'react-chartjs-2'
import {
  Chart, ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController,
  LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale,
  RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip
} from 'chart.js';

Chart.register(
  ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController,
  PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale,
  TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip
);

function Graphic() {
  const data = useSelector(state => state.data.items)

  let state;

  if(data){
    const infected = data.TotalConfirmed
    const deaths = data.TotalDeaths
    const recovered = data.TotalRecovered
    const active = infected - recovered
    state= {
      labels:["Infected", "Deaths","Recovered" , "Active"],
      datasets:
      [{
          label: "Covid-19",
          backgroundColor: ['#53a9ff', "#81ff9a", "#ff6464", "#f8d94e"],
          borderWidth: "0",
          data: [infected, deaths, recovered , active]
      }]
    }
  }
  return (
    <div>
             <Container>
            <Row>
                <Col className='graphic'>
                    {
                      <Bar data={state} />
                    }
                </Col>
                </Row>
        </Container>
    </div>
  )
}

export default Graphic