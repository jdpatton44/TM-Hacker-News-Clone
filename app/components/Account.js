import React from 'react'
import Loading from './Loading';

export default function Account() {
    const [loading, setLoading] = React.useState(false);

    if (loading) {
        return <Loading loading={loading} />;
    }
    return (
        <>
            <h1>Account Name</h1>
            <h3>Account Total</h3>
            <div>Results</div>
        </>
    )
}