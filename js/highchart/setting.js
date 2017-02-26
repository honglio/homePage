(function(exports) {

    window.Highcharts.wrap(Highcharts.Fx.prototype, 'run', function(proceed) {
        var fx = this,
            args = arguments;
        setTimeout(function() {
            proceed.apply(fx, [].slice.call(args, 1));
        }, fx.options.delay || 0);
    });

    function PointOverall(data) {
        var points = [];

        if (data.length > 0) {
            data.forEach(function(val) {
                if (val > 2.5) {
                    points.push({ y: val, color: '#259b24' });
                } else {
                    points.push({ y: val, color: '#e51c23' });
                }
            });
        }

        return points;
    }

    function PointDetail(data) {
        var categories = [],
            series = [];

        if (data.length > 0) {
            data.forEach(function(detail, i) {
                categories.push(detail.name);
                if (Array.isArray(detail.value)) {
                    detail.value.forEach(function(val) {
                        var arr = new Array;
                        for (var j = 0; j < i; j += 1) {
                            arr.push(null);
                        }
                        arr.push(val.data);
                        series.push({
                            name: val.name,
                            data: arr
                        });
                    })
                }
            });
        }
        return {
            categories: categories,
            series: series
        };
    }

    function OptionOverall(series, axis) {
        return {
            chart: {
                type: 'spline',
                spacingBottom: 20,
                backgroundColor: 'rgba(0,0,0,0)'
            },
            noData: {
                style: {
                    fontSize: '20px',
                    color: '#a0a0a0'
                }
            },
            title: {
                text: '',
                style: {
                    fontSize: '20px'
                }
            },
            xAxis: {
                labels: {
                    enabled: false
                },
                tickWidth: 0,
                lineWidth: 0
            },
            yAxis: axis,
            tooltip: {
                enabled: false
            },
            plotOptions: {
                spline: {
                    allowPointSelect: false,
                    enableMouseTracking: false,
                    marker: {
                        enabled: false
                    },
                    color: '#fff'
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                padding: "0 0 10px 0",
                data: series,
                lineWidth: 2
            }],
            symbols: ["circle", "circle", "circle", "circle", "circle", "circle"]
        };
    }

    function OptionDetail(points) {

        return {
            chart: {
                type: 'column',
                backgroundColor: 'rgba(0,0,0,0)'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: points.categories,
                labels: {
                    style: { color: '#fff' }
                }
            },
            yAxis: {
                labels: {
                    enabled: false
                },
                title: {
                    text: null
                },
                gridLineWidth: 0,
                lineWidth: 0
            },
            credits: {
                enabled: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.0f}%<br/>',
                shared: true
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },
            series: points.series
        };
    }

    /**
     * Make blood sugar chart to the specified selector place
     * e.g., window.makeBloodSugarChart(data, '#containter2')
     * @method makeBloodSugarChart
     * @param {data} [object] blood sugar data
     * @param {selector} [string] jQuery selector string.  Defaults to body.
     * @returns 
     *
     */

    exports.overall = function(selector, data, callback) {
        var series = PointOverall(data || []);
        var axis = {
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            gridLineWidth: 0,
            lineWidth: 0
        }
        var options = OptionOverall(series, axis);

        window.Highcharts.setOptions({
            lang: {
                noData: 'No Data',
                loading: 'Loading...'
            }
        });

        if (selector) {
            window.Highcharts.chart(selector, options, callback);
        }
    }

    exports.detail = function(selector, data, callback) {
        var points = PointDetail(data || []);
        var options = OptionDetail(points);
        console.log(options);
        window.Highcharts.setOptions({
            lang: {
                noData: 'No Data',
                loading: 'Loading...'
            }
        });

        if (selector) {
            window.Highcharts.chart(selector, options, callback);
        }
    }

    exports.specific = function(selector, data, callback) {
        var options = {

            chart: {
                type: 'solidgauge',
                marginTop: 0,
                backgroundColor: 'rgba(0,0,0,0)'
            },

            credits: {
                enabled: false
            },

            title: {
                style: {
                    fontSize: 0
                }
            },

            tooltip: {
                enabled: false
            },

            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{
                    outerRadius: '87%',
                    innerRadius: '77%',
                    backgroundColor: Highcharts.Color('#555').setOpacity(0.3).get(),
                    borderWidth: 0
                }]
            },

            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },

            plotOptions: {
                solidgauge: {
                    borderWidth: '4px',
                    dataLabels: {
                        borderWidth: 0,
                        y: -8
                    },
                    stickyTracking: false
                }
            },

            series: [{
                borderColor: '#5DDC5D',
                data: [{
                    color: '#5DDC5D',
                    radius: '82%',
                    innerRadius: '82%',
                    y: data
                }],
                dataLabels: {
                    format: '<span style="font-size:2em; color: {color}; font-weight: bold; text-shadow: none;">{y}%</span>'
                },
                animation: {
                    delay: 1000
                }
            }]
        };

        console.log(data);

        if (selector) {
            window.Highcharts.chart(selector, options, callback);
        }
    }

})(typeof exports === 'undefined' ? this['mychart'] = {} : exports);
