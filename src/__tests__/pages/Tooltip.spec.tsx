import { render, screen } from '@testing-library/react';

import React from 'react';

import Tooltip from '../../components/Tooltip';


describe('Testing Header.tsx', () => {
  // Deve ser possível exibir o elemento h1 na página
  it('should be able to show the h1 element', () => {
    render(<Tooltip title="teste" />);
    const h1Element = screen.getByText(/teste/i);

    expect(h1Element).toBeInTheDocument();
  });
});
