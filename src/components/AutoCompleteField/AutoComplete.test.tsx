import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { AutoCompleteField } from '.';

describe('AutoCompleteField', () => {
  const onSearch = jest.fn();

  const mockedData = [
    { id: 1, name: 'USA' },
    { id: 2, name: 'UK' },
  ];

  const setup = (data: { id: number; name: string }[]) => {
    render(
      <AutoCompleteField
        id="country"
        label="Search for country"
        data={data}
        onSearch={onSearch}
      />
    );

    const textInput = screen.getByRole('textbox', {
      name: /Search for country/i,
    });

    return { textInput };
  };

  test('should render text input field with label', () => {
    const { textInput } = setup([]);
    expect(screen.getByLabelText(/Search for country/)).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();
  });

  test('calls onSearch onFocus and displays the searched data', () => {
    const { textInput } = setup(mockedData);

    expect(screen.queryByRole('button', { name: /USA/ })).toBeNull();
    expect(screen.queryByRole('button', { name: /UK/ })).toBeNull();

    fireEvent.focus(textInput);
    expect(onSearch).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /USA/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /UK/ })).toBeInTheDocument();
  });

  test('calls onSearch when an input value is added', async () => {
    const { textInput } = setup(mockedData);

    expect(screen.queryByRole('button', { name: /USA/ })).toBeNull();
    expect(screen.queryByRole('button', { name: /UK/ })).toBeNull();

    fireEvent.focus(textInput);
    fireEvent.change(textInput, { target: { value: 'USA' } });

    await waitFor(() => {
      expect(textInput).toHaveValue('USA');
      expect(onSearch).toHaveBeenCalledWith('USA');
      expect(screen.getByRole('button', { name: /USA/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /UK/ })).toBeInTheDocument();
    });
  });

  test('should close the drop down when you select an item', async () => {
    const { textInput } = setup(mockedData);
    fireEvent.focus(textInput);

    const item = screen.getByRole('button', { name: /USA/ });
    expect(item).toBeInTheDocument();

    expect(item).toBeInTheDocument();
    fireEvent.click(item);
    expect(screen.queryByRole('button', { name: /USA/ })).toBeNull();
  });
});
