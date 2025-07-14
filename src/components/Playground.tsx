"use client"

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import 'video.js'
import 'videojs-theme-kit/videojs-skin.js'
import 'videojs-theme-kit/style.css'
import videojs from 'video.js';
import 'video.js/dist/video-js.css'

export default function Playground() {

    let playerId = 'my-player';
    const searchParams = useSearchParams();

    const SDK_VERSION = require('videojs-theme-kit/package.json')['version'];


    const videoRef = useRef(null);
    const playerRef = useRef<any>(null);
    const [formValues, setFormValues] = useState({
        skin: searchParams.get('skin') || 'sleek',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;
        const newValue =
            type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : value.trim();

        setFormValues(prev => ({ ...prev, [name]: newValue }));
    };


    useEffect(() => {
        window.addEventListener('mousemove', handleDragging);
        window.addEventListener('mouseup', stopDragging);
        return () => {
            window.removeEventListener('mousemove', handleDragging);
            window.removeEventListener('mouseup', stopDragging);
        };
    }, []);


    const [dividerX, setDividerX] = useState(50); // percent
    const isDragging = useRef(false);

    const startDragging = () => {
        isDragging.current = true;
    };

    const stopDragging = () => {
        isDragging.current = false;
    };

    const handleDragging = (e: MouseEvent) => {
        if (!isDragging.current) return;
        const newX = (e.clientX / window.innerWidth) * 100;
        setDividerX(Math.min(90, Math.max(10, newX)));
    };


    const initiatePlayer = () => {
        console.log(videojs.getPlayer('my-player'));

        if (videojs.getPlayer('my-player')) {
            videojs?.getPlayer('my-player')?.dispose();
            playerRef.current = null
            let videoElement = document.createElement('video');
            videoElement.className = 'video-js';
            videoElement.id = playerId;
            document.getElementsByClassName('vl-container')?.[0]?.append(videoElement)
        }

        playerRef.current = videojs('my-player', {
            controls: true,
            fluid: true,
            autoplay: true,
            sources: [{ src: "https://d2zihajmogu5jn.cloudfront.net/CoitTower/master_ts_segtimes.m3u8" }]
        }, () => {
            playerRef.current.theme({ skin: formValues.skin })

        })
    }

    const codeSnippet= `player.on('ready',()=>{ \n`+
        `player.theme({skin:'SKIN_NAME'}) \n` +
    '})`'


    useEffect(() => {

        if (typeof window === "undefined") return; 
        
        const script = document.createElement("script",);
        script.setAttribute('data-name','BMC-Widget')
        script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        script.setAttribute('data-id', 'boulderproblems');
        script.setAttribute('data-description', 'Thank you for your support!');
        script.setAttribute('data-message', 'This web is free to use. Do you want to help supporting it?');
        script.setAttribute('data-color',"#FF5F5F")
        script.setAttribute('data-position','right')
        script.setAttribute('data-x_margin','18')
        script.setAttribute('data-y-margin','18')
        script.async = true

        script.onload=function(){
            var evt = document.createEvent('Event');  
            evt.initEvent('DOMContentLoaded', false, false);  
            window.dispatchEvent(evt);
        }
        document.head.appendChild(script)
        initiatePlayer();
        return()=>{
            document.head.removeChild(script);
        }
    }, []);


    return (
        <div className='bg-[#e6ecf0] playground-wrapper flex flex-col md:flex-row min-h-screen'>
            <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="Dds05" data-description="Support me on Buy me a coffee!" data-message="" data-color="#FF813F" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
            <div style={{ width: `${100 - dividerX}%` }} className='user-controls  w-full md:w-auto'>
                <u className='text-gray-800'> <h2 className='text-center text-2xl mb-5 font-bold'>
                    Videojs Theme Kit @{SDK_VERSION}
                </h2></u>
                <div className="w-full  bg-white shadow-md rounded-xl p-6 mb-5">
                    <h2 className="text-xl font-semibold text-black">Github: <a target='_blank' className='font-medium text-blue-600 dark:text-blue-500 hover:underline' href="https://github.com/dds05/videojs-theme-kit">https://github.com/dds05/videojs-theme-kit</a></h2>
                </div>
                <div className="w-full  bg-white shadow-md rounded-xl p-6 mb-5">
                    <h2 className="text-xl font-semibold text-black">NPM: <a target='_blank' className='font-medium text-blue-600 dark:text-blue-500 hover:underline' href="https://www.npmjs.com/package/videojs-theme-kit">https://www.npmjs.com/package/videojs-theme-kit</a></h2>
                </div>

                <div className="w-full  bg-white shadow-md rounded-xl p-6 mb-5">
                    <h2 className="text-xl font-semibold text-black mb-2">Installation:</h2>
                    <code className='text-black'>npm i videojs-theme-kit</code>
                </div>
                <div className="w-full  bg-white shadow-md rounded-xl p-6 mb-5">
                    <h2 className="text-xl font-semibold text-black mb-2">Usage:</h2>
                    <code className='text-black'>
                        {codeSnippet}
                    </code>
                    <br></br>
                    <br></br>
                    <code className='text-black'>
                       <b>Note:</b> (Available Skin Names : ['slate','spaced','sleek','zen'])
                    </code>
                </div>
                <div className="w-full  bg-white shadow-md rounded-xl p-6 mb-5">
                    <h2 className="text-xl font-semibold mb-4 text-black">Customize UI</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="mb-4">
                            <label className="block text-sm mb-1 text-gray-500 font-semibold">Skin</label>
                            <select onChange={handleChange} value={formValues.skin} name="skin" className="w-full border px-3 py-2 rounded text-sm block text-gray-500">
                                <option value="">Please select skin type</option>
                                <option value="slate">Slate</option>
                                <option value="spaced">Spaced</option>
                                <option value="sleek">Sleek</option>
                                <option value="zen">Zen</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mb-4'>
                    <a
                        className="group relative inline-block text-sm font-medium text-blue-600 focus:ring-3 focus:outline-hidden"
                        href="#"
                    >
                        <span
                            className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-blue-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                        ></span>

                        <span className="relative block border border-current bg-white px-8 py-3" onClick={() => initiatePlayer()}> Apply Theme </span>
                    </a>
                </div>
            </div>


            <div
                onMouseDown={startDragging}
                className="group relative cursor-col-resize mx-5"
                style={{ width: '8px' }}
            >
                <div
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gray-400 rounded-full group-hover:bg-blue-500 transition"
                ></div>
            </div>
            <div style={{ width: `${100 - dividerX}%` }} className='vl-container w-full md:w-[800px]'>
                <video preload='auto' id='my-player' className='video-js' style={{ width: '100%', height: '100%' }}></video>
            </div>
        </div>
    );
}
