import Head from "next/head";
"use client"
import React, {useState } from "react";
import Header from '../app/modules/Header/Header'
import TaskCreator from "./modules/TaskComponents/TaskCreator";
import Layout from './modules/layouts/Layout'
export default function Home() {
  

  return (
      <div>
        <Layout></Layout>
      </div>
  );
}
