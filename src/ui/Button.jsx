import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.4rem;
    text-transform: uppercase;
    padding: 0.4rem 0.8rem;
    font-weight: 600;
  `,
  medium: css`
    font-size: 1.6rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.8rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    background: var(--color-grey-0);
    color: var(--color-grey-600);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  text-align: center;
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.$variation]}
`;

export default Button;
