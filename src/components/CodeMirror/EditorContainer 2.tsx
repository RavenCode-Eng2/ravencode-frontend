import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import axios from 'axios';
import CodeEditor from './CodeEditor';

// Valores por defecto para tamaños
const defaultEditorSize = { width: '702px', height: '130px' };
const defaultConsoleSize = { width: '702px', height: '50px' };

// Componente visual para la consola
const Console = styled.div<{ size?: { width: string; height: string } }>`
  background: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0;
  width: ${(props) => props.size?.width || defaultConsoleSize.width};
`;

const Header = styled.div`
  background:rgb(5, 18, 31);
  height: 3rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
`;

const TextArea = styled.textarea<{ size?: { height: string } }>`
  flex-grow: 1;
  resize: none;
  border: none;
  outline: none;
  padding: 0;
  font-size: 1rem;
  font-family: monospace;
  background: #fdfdfd;
  min-height: ${(props) => props.size?.height || defaultConsoleSize.height};
  color: #333;
`;

const StyledEditorContainer = styled.div<{ size?: { width: string; height: string } }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.size?.width || defaultEditorSize.width};
  background: rgb(5, 18, 31);
  margin: 0;
  padding: 0;
`;

const UpperToolBar = styled.div`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;

const SelectBars = styled.div`
  display: flex;
  gap: 1rem;
  & > div {
    width: 10rem;
  }
`;

const CodeEditorContainer = styled.div<{ size?: { width: string; height: string } }>`
  flex-grow: 1;
  height: ${(props) => props.size?.height || defaultEditorSize.height};
  width: ${(props) => props.size?.width || defaultEditorSize.width};
  margin: 0;
`;

const LowerToolBar = styled.div`
  background: #fff;
  display: flex;
  justify-content: flex-end;
  padding: 0.8rem 1rem;
`;

const RunButton = styled.button`
  padding: 0.6rem 1rem;
  background: #0097d7;
  color: white;
  border: none;
  border-radius: 32px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #007bb5;
  }
`;

// Opciones para los selectores de lenguaje y tema
const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' }
];

const themeOptions = [
  { value: 'githubDark', label: 'GitHub Dark' },
  { value: 'githubLight', label: 'GitHub Light' },
  { value: 'bespin', label: 'Bespin' },
  { value: 'duotoneDark', label: 'Duotone Dark' },
  { value: 'duotoneLight', label: 'Duotone Light' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'xcodeDark', label: 'Xcode Dark' },
  { value: 'xcodeLight', label: 'Xcode Light' },
  { value: 'vscodeDark', label: 'VSCode Dark' },
  { value: 'vscodeLight', label: 'VSCode Light' },
  { value: 'okaidia', label: 'Okaidia' }
];

// Tipos para las props
interface EditorContainerProps {
  currentLanguage: string;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
  currentTheme: { value: string; label: string };
  setCurrentTheme: React.Dispatch<React.SetStateAction<{ value: string; label: string }>>;
  currentCode: string;
  setCurrentCode: React.Dispatch<React.SetStateAction<string>>;
  editorSize: { width: string; height: string };
  consoleSize: { width: string; height: string };
}

const EditorContainer: React.FC<EditorContainerProps> = ({
  currentLanguage,
  setCurrentLanguage,
  currentTheme,
  setCurrentTheme,
  currentCode,
  setCurrentCode,
  editorSize,
  consoleSize
}) => {
  const [currentOutput, setCurrentOutput] = useState<string>('');

  // Función para ejecutar el código con Judge0
  const handleRunCode = async () => {
    setCurrentOutput('⏳ Ejecutando...');

    const encode = (str: string) => btoa(unescape(encodeURIComponent(str)));
    const decode = (str: string) => atob(str || '');

    const postSubmission = async (language_id: number, source_code: string) => {
      const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'b4e5c5a05fmsh9adf6ec091523f8p165338jsncc58f31c26e1',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
          language_id: language_id,
          source_code: encode(source_code),
          stdin: encode('')
        }
      };
      const res = await axios.request(options);
      return res.data.token;
    };

    const getOutput = async (token: string) => {
      const options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
          'X-RapidAPI-Key': '3ed7a75b44mshc9e28568fe0317bp17b5b2jsn6d89943165d8',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      };
      const res = await axios.request(options);
      if (res.data.status_id <= 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return await getOutput(token);
      }
      return res.data;
    };

    const language_id = currentLanguage === 'python' ? 71 : 63;
    try {
      const token = await postSubmission(language_id, currentCode);
      const res = await getOutput(token);
      let result = decode(res.stdout || '') || decode(res.stderr || '') || decode(res.compile_output || '');

      if (res.status.description.toLowerCase().includes('accepted')) {
        result = result.replace('Accepted', '').trim();
      }

      setCurrentOutput(result);
    } catch (err) {
      setCurrentOutput('❌ Error al ejecutar el código.');
    }
  };

  return (
    <StyledEditorContainer size={editorSize}>
      <UpperToolBar>
        <h3 style={{ 
            color: '#2C3E50',           
            fontWeight: 'bold',         
            fontFamily: '"Poppins", sans-serif'  
            }}>RavenCode
        </h3>
        <LowerToolBar>
          <RunButton onClick={handleRunCode}>Run</RunButton>
        </LowerToolBar>
        <SelectBars>
          <Select
            options={languageOptions}
            value={languageOptions.find((l) => l.value === currentLanguage)}
            onChange={(option) => setCurrentLanguage(option?.value || '')}
          />
          <Select
            options={themeOptions}
            value={currentTheme}
            onChange={(option) => setCurrentTheme(option || currentTheme)}
          />
        </SelectBars>
      </UpperToolBar>

      <CodeEditorContainer size={editorSize}>
        <CodeEditor
          currentLanguage={currentLanguage}
          currentTheme={currentTheme.value}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
        />
      </CodeEditorContainer>

      <Console size={consoleSize}>
        <Header>Output:</Header>
        <TextArea value={currentOutput || 'Ejecuta tu código para ver el resultado aquí...'} disabled />
      </Console>
    </StyledEditorContainer>
  );
};

export default EditorContainer;
