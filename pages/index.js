import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json'
import React from 'react';
import {useRouter} from 'next/router'

function Title(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>

            <style jsx> {`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}

//Componente react
/*function HomePage() {
    //JSX
    return (
        <div>
            <GlobalStyle />
            <Title tag="h2">Boas vindas de volta!</Title>
            <h2>Discord - Alura Matrix</h2>

        </div>
    ) 
    
  }
  
  export default HomePage
  
*/

export default function PaginaInicial() {
    //const username = 'DouglasMreli';
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();

    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[100],
            // backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
            backgroundImage: 'url(https://1.bp.blogspot.com/-oPMAj_aKWno/XrtxEOnlpaI/AAAAAAAAvUw/gP7D0tFjBUQ2n3J_q__ar3YUfAPL1WbLACLcBGAsYHQ/s2560/books_library_shelves_138556_3840x2160.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={ function (infosDoEvento) {
                infosDoEvento.preventDefault();
                roteamento.push(`/chat?username=${username}`) // a crase ` cria um template
                // window.location.href = '/chat'
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Title tag="h2">Boas vindas de volta!</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
              
              {/*<input 
                type="text" 
                value={username}
                onChange={function haandler(event) {
                  //console.log(event.target.value)
                  // onde ta o valor?
                  const valor = event.target.value;
                  // Trocar o valor da variável
                  // através do React e avise quem precisa
                  setUsername(valor);
                }}
              />*/}
              {<TextField
                value={username}
                onChange={function handler(event) {
                  //console.log(event.target.value)
                  // onde ta o valor?
                  const valor = event.target.value;
                  // Trocar o valor da variável
                  // através do React e avise quem precisa
                  setUsername(valor);
                }}
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[400],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />}
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={
                  username.length > 2
                  ? `https://github.com/${username}.png`
                  : 'https://static.wixstatic.com/media/fe0a41_27984d1534fa43e69d6b1ff387374831~mv2.gif'}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }