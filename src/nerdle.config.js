module.exports = {
    theme: {
        default: {
            backgroundColor: 'white',
            transitionDuration: '1.5s',
            color: 'black'
        },
        dark: {
            backgroundColor: '#212121',
            transitionDuration: '1.5s'
        },
        msgColor: {
            success: {
                backgroundColor: '#A7FD9B',
            },
            error: {
                backgroundColor: '#FECDD3',
                color: 'black'
            }
        }
    },
    keys: [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        ['=', '+', '-', '/', '*', 'ENTER', '\u232b'],
    ],
    equationList: {
        5: ['1+2=3', '1*3=3', '9/3=3', '2*3=6'],
        8: ['11+22=33', '93-17=76', '01+01=02', '05*10=50', '7+8-13=2', '39-24=15', '9+8/2=13', '65/5-4=9', '01*01=01', '100-1=99', '17-2*7=3'],
        // test = 8: ['01+01=02'],
    },
    modes: {
        'classic': 8,
        'mini': 5,
        'maxi': 12
    }
}