import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DivComponent } from '../components/divider';



const COLORS = ['#6366f1', '#22c55e', '#facc15', '#f97316', '#f45218'];


const ClientsGraphicalData = ({ tokens }) => {
    const data = [
        { name: "1 day", value: 0 },//14,15,7,3,9
        { name: "3 days", value: 0 },
        { name: "1 week", value: 0 },
        { name: "2 weeks", value: 0 },
        { name: "1 month", value: 0 }
    ]

    for (let obj of tokens) {

          // eslint-disable-next-line default-case
          switch (obj.payment) {
            case 'ugx.1000': data[0].value+=1; break
            case 'ugx.2500': data[1].value += 1; break
            case 'ugx.5000': data[2].value += 1; break
            case 'ugx.9000': data[3].value += 1; break
            case 'ugx.18000': data[4].value += 1; break
            case 'any':data[0].value+=1; break
        }
    }

    return (
        <DivComponent clas={' h-[45vh]  sm2:h-[30vh] mx-auto md:w-full'}>
                <ResponsiveContainer   className={''}>
                    <PieChart>
                        <Pie 
                            data={data}
                            cx='50%'
                            cy='50%'
                            outerRadius={55}
                            fill='#8884d8'
                            dataKey={'value'}
                            label >
                            {   
                                data.map((entry, index) => {
                                    return(
                                        <Cell key={`cell-${index}`} fill={COLORS[index% COLORS.length]}/>
                                    )
                                })
                        }
                        </Pie>
                    <Tooltip formatter={(value) => `${value} client(s)`} />
                    <Legend style={{top:'250px'}} />
                    </PieChart>
             
                </ResponsiveContainer>
   
        </DivComponent>
    )
}


export default ClientsGraphicalData;