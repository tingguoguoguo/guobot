export default () => {
  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'image',
          url: 'https://pokedex-list.netlify.app/images/official-artwork/front_default/1.png',
          size: 'full',
          aspectMode: 'cover',
          aspectRatio: '1:1',
          gravity: 'center'
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [],
          position: 'absolute',
          background: {
            type: 'linearGradient',
            angle: '0deg',
            endColor: '#00000000',
            startColor: '#00000099'
          },
          width: '100%',
          height: '40%',
          offsetBottom: '0px',
          offsetStart: '0px',
          offsetEnd: '0px'
        },
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'text',
                      text: 'Brown Grand Hotel',
                      size: 'xl',
                      color: '#ffffff'
                    }
                  ]
                }
              ],
              spacing: 'xs'
            }
          ],
          position: 'absolute',
          offsetBottom: '0px',
          offsetStart: '0px',
          offsetEnd: '0px',
          paddingAll: '20px'
        },
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'text',
              text: '屬性',
              size: 'xs',
              color: '#ffffff',
              align: 'center',
              gravity: 'center'
            }
          ],
          backgroundColor: '#000000',
          paddingAll: '2px',
          paddingStart: '4px',
          paddingEnd: '4px',
          flex: 0,
          position: 'absolute',
          offsetStart: '18px',
          offsetTop: '18px',
          cornerRadius: '100px',
          width: '75px',
          height: '25px'
        }
      ],
      paddingAll: '0px'
    }
  }
}
