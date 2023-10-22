export const pie_chart_options  = {
    responsive: false,
    plugins: {
      legend: {
        position: "right",
        labels:{
            font: {
                size: 12
            }
        }
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart"
      },
      
    }
  };


export const line_chart_options = {
  responsive: true,
  maintainAspectRatio: false,
  font: {
    size: 8
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: {
          size: 8
        }
      }
    }
  }
}



export const make_uuid = () => {
    let chars = "xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}

export const none_pie_data =  {
  labels: [],
  datasets: [
    {
      label: '',
      data: [],
      backgroundColor: [
        
      ],
      borderColor: [
       
      ],
      borderWidth: 1,
    },
  ],
};



export const none_line_data = {
  labels: [],
  datasets: [
    {
      label: ' ',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};