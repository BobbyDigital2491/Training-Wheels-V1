import { Show } from "@refinedev/antd";
import { Card, Divider } from "antd";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useEffect } from "react";
import { authProvider } from "src/authProvider";
import { supabaseClient } from "src/utility/supabaseClient";

interface ShowData {
    work_element: string;
    id: number;
    plan_no: string;
    element_time: string;
    mv: string;
    mod: string;
    model_type: string;
    st: string; 
    code: string;
    symbol: string;
    vp: string;
    no:string;
}

const ShowDetails: React.FC<{ data: ShowData }> = ({ data }) => {
    return (
        <Show title="SMP Data">
            <Card>
            <h3>No</h3>
            {data.no}
            <Divider/>
            
            <h3>Work Element: </h3>
            {data.work_element}
            <Divider/>

            <h3>Plan Number:</h3>
            {data.plan_no}
            <Divider/>
            <p>Element Time:</p>
            {data.element_time}
            <Divider/>
            <p>MV:</p>
            {data.mv}
            <Divider/>
            <p>Mod:</p>
            {data.mod}
            <Divider/>
            <p>Model Type:</p>
            {data.model_type}
            <Divider/>
            <p>ST:</p>
            {data.st}
            <Divider/>
            <p>Code:</p>
            {data.code}
            <Divider/>
            <p>Symbol:</p>
            {data.symbol}
            <Divider/>
            <p>VP:</p>
            {data.vp}
            </Card>
        </Show>
    );
};

const SMPShow: React.FC<{ data: ShowData }> = ({ data }) => {
    return (
        <div>
            <ShowDetails data={data} />
        </div>
    );
};

export default SMPShow;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { params } = context;
    const id = params?.id;

    // Fetch data from Supabase for the specific id
    const { data: rowData, error } = await supabaseClient
        .from('Standard Method & Procedure (SMP)')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching data:', error.message);
        return {
            notFound: true, // Return 404 page if data is not found or there's an error
        };
    }

    // Fetch translations for the page
    const translateProps = await serverSideTranslations(context.locale ?? "en", ["common"]);

    return {
        props: {
            data: rowData,
            ...translateProps, // Include translated props
        },
    };
};
