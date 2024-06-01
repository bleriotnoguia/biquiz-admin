import React from 'react'

type Props = {
  className?: string
}

const BiquizAppLogo = ({ className = '' }: Props) => (
  <svg
    version="1.1"
    id="svg1"
    xmlSpace="preserve"
    width="135"
    height="50"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{
      fontStyle: 'italic',
      fontVariant: 'normal',
      fontWeight: 500,
      fontStretch: 'normal',
      fontSize: '50px',
      fontFamily: 'Montserrat',
      fontVariantLigatures: 'normal',
      fontVariantPosition: 'normal',
      fontVariantCaps: 'normal',
      fontVariantNumeric: 'normal',
      fontVariantAlternates: 'normal',
      fontVariantEastAsian: 'normal',
      fontFeatureSettings: 'normal',
      fontVariationSettings: 'normal',
      textIndent: 0,
      textAlign: 'start',
      textDecorationLine: 'none',
      textDecorationStyle: 'solid',
      textDecorationColor: '#000000',
      letterSpacing: 'normal',
      wordSpacing: 'normal',
      textTransform: 'none',
      direction: 'ltr',
      textOrientation: 'mixed',
      dominantBaseline: 'auto',
      baselineShift: 'baseline',
      whiteSpace: 'normal',
      opacity: 1,
      vectorEffect: 'none',
      fill: '#000000',
      fillOpacity: 1,
      strokeWidth: '0.99999874',
      strokeLinecap: 'butt',
      strokeLinejoin: 'miter',
      strokeMiterlimit: 4,
      strokeDasharray: 'none',
      strokeDashoffset: 0,
      strokeOpacity: 1,
      stopColor: '#000000',
      stopOpacity: 1,
    }}
  >
    <g id="g1" transform="matrix(3.7795276,0,0,3.7795276,-254.90657,-395.47034)">
      <text
        xmlSpace="preserve"
        style={{
          fontSize: '6px',
        }}
        id="text1"
      >
        <tspan
          id="tspan1"
          style={{
            fontStyle: 'italic',
            fontVariant: 'normal',
            fontWeight: 500,
            fontStretch: 'normal',
            fontFamily: 'Montserrat',
          }}
          x="67"
          y="114"
        >
          Biquiz App
        </tspan>
      </text>
    </g>
  </svg>
)

export default BiquizAppLogo
