import '@babel/standalone';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

import { transform } from '@babel/standalone';

function transpileInputCode(inputCode: string) {
  return transform(inputCode, {
    presets: ['react', ['env', { modules: false }]], // Ensure modules are not transpiled into a format that can't be executed
  }).code;
}

const PreviewScreen = ({ html_code } : { html_code: string }) => {
  const compiledCode = transpileInputCode(html_code);

  return (
    <LiveProvider code={html_code || '' } scope={{}}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '10px' }}>
          <LiveEditor style={{ fontFamily: 'monospace' }} />
        </div>
        <div style={{ flex: 1, padding: '10px', borderLeft: '1px solid grey' }}>
          <LivePreview />
          <LiveError style={{ color: 'red', padding: '10px' }} />
        </div>
      </div>
    </LiveProvider>
  );
};

export default PreviewScreen;