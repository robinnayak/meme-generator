import React from 'react'

interface HeaderProps {
    heading: string;
    subheading: string;
}

const Header = ({ heading, subheading }: HeaderProps) => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white mb-4">
            <h1 className="text-3xl font-bold text-center mb-2">{heading}</h1>
            <p className="text-center text-blue-100">{subheading}</p>
        </div>
    )
}

export default Header