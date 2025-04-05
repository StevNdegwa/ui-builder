import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  ${({
    theme: {
      spacings: {
        padding: { xs, sm, md, lg, xl },
        margin: { xs: mXs, sm: mSm, md: mMd, lg: mLg, xl: mXl },
      },
      borderRadius: { xs: rXs, sm: rSm, md: rMd, lg: rLg, xl: rXl },
    },
  }) => `
    &.padding-xs {
      padding: ${xs};
    }
    &.padding-sm {
      padding: ${sm};
    }
    &.padding-md {
      padding: ${md};
    }
    &.padding-lg {
      padding: ${lg};
    }
    &.padding-xl {
      padding: ${xl};
    }
    &.margin-xs {
      margin: ${mXs};
    }
    &.margin-sm {
      margin: ${mSm};
    }
    &.margin-md {  
      margin: ${mMd};
    }
    &.margin-lg {
      margin: ${mLg};
    }
    &.margin-xl {
      margin: ${mXl};
    }
    &.rounded-xs {
      border-radius: ${rXs};
    }
    &.rounded-sm {
      border-radius: ${rSm};
    }
    &.rounded-md {
      border-radius: ${rMd};
    }
    &.rounded-lg {
      border-radius: ${rLg};
    }   
    &.rounded-xl {
      border-radius: ${rXl};
    }
  `};
`;
