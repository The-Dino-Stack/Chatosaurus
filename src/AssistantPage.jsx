import React from 'react';
import Layout from '@theme/Layout';
import Chat from './components/Chat';
import './assets/styles.css';

export default function AssistantPage() {
    return (
        <Layout title="Assistant">
            <div className="assistant-page-container">
                <Chat />
            </div>
        </Layout>
    );
}
