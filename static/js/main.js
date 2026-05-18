document.addEventListener('DOMContentLoaded', () => {
    // --- Landing Page Rain Effect ---
    if (document.getElementById('rain-container')) {
        createRain();
    }

    // --- Chat Room Logic ---
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesArea = document.getElementById('messages-area');
    const burnBtn = document.getElementById('burn-btn');
    
    // Media uploads
    const recordBtn = document.getElementById('record-btn');

    if (sendBtn) {
        // Fetch existing messages on load
        fetch('/api/messages')
            .then(r => r.json())
            .then(data => {
                if (data.messages) {
                    data.messages.forEach(msg => appendMessage(msg));
                }
            });

        // Send Text
        sendBtn.addEventListener('click', () => sendText());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendText();
        });

        // Voice Recording
        let mediaRecorder;
        let audioChunks = [];
        let isRecording = false;

        recordBtn.addEventListener('click', async () => {
            if (!isRecording) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.start();
                    isRecording = true;
                    recordBtn.classList.add('recording');
                    audioChunks = [];

                    mediaRecorder.addEventListener("dataavailable", event => {
                        audioChunks.push(event.data);
                    });

                    mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                        const reader = new FileReader();
                        reader.readAsDataURL(audioBlob);
                        reader.onloadend = function() {
                            sendMedia('audio', reader.result);
                        };
                    });
                } catch (err) {
                    alert('Microphone access denied. Some things must be written.');
                }
            } else {
                mediaRecorder.stop();
                isRecording = false;
                recordBtn.classList.remove('recording');
            }
        });

        // Burn Ritual
        burnBtn.addEventListener('click', initiateBurnRitual);
    }

    function sendText() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        appendMessage({ type: 'text', content: text });
        chatInput.value = '';
        
        fetch('/api/messages', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ text })
        });
    }

    function sendMedia(type, content) {
        appendMessage({ type, content });
        fetch('/api/messages', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ [type]: content })
        });
    }

    function appendMessage(msg) {
        const div = document.createElement('div');
        div.className = 'message';
        
        if (msg.type === 'text') {
            div.textContent = msg.content;
        } else if (msg.type === 'audio') {
            const audio = document.createElement('audio');
            audio.controls = true;
            audio.src = msg.content;
            div.appendChild(audio);
        }
        
        messagesArea.appendChild(div);
        document.getElementById('chat-container').scrollTop = document.getElementById('chat-container').scrollHeight;
    }

    function initiateBurnRitual() {
        if (!confirm("Are you sure? Once it burns, it's gone forever.")) return;

        // 1. Freeze interface & Shake
        document.body.classList.add('shake-screen');
        chatInput.disabled = true;
        sendBtn.disabled = true;
        recordBtn.disabled = true;
        burnBtn.style.pointerEvents = 'none';
        burnBtn.style.opacity = '0';

        // 2. Start Fire Animation
        if (typeof window.startFire === 'function') {
            window.startFire();
        }
        
        const canvas = document.getElementById('fire-canvas');
        canvas.style.display = 'block';
        setTimeout(() => canvas.style.opacity = '1', 100);

        // 3. Burn Messages
        const messages = document.querySelectorAll('.message');
        messages.forEach((msg, index) => {
            setTimeout(() => {
                msg.classList.add('burning-effect');
            }, index * 200 + 1000); // Staggered burning
        });

        // 4. Fade to black
        setTimeout(() => {
            document.body.classList.remove('shake-screen');
            document.getElementById('burn-overlay').style.opacity = '1';
        }, messages.length * 200 + 3000);

        // 5. Show final screen
        setTimeout(() => {
            const final = document.getElementById('final-screen');
            final.classList.remove('hidden');
            setTimeout(() => final.classList.add('visible'), 100);
            
            // Tell server to delete
            fetch('/api/burn', { method: 'POST' });
            
        }, messages.length * 200 + 7000);
    }

    function createRain() {
        const container = document.getElementById('rain-container');
        for (let i = 0; i < 100; i++) {
            const drop = document.createElement('div');
            drop.style.position = 'absolute';
            drop.style.width = '1px';
            drop.style.height = Math.random() * 20 + 10 + 'px';
            drop.style.background = 'rgba(255,255,255,0.2)';
            drop.style.left = Math.random() * 100 + 'vw';
            drop.style.top = Math.random() * -100 + 'vh';
            drop.style.animation = `fall ${Math.random() * 1 + 0.5}s linear infinite`;
            container.appendChild(drop);
        }
        
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fall {
                to { transform: translateY(100vh); }
            }
        `;
        document.head.appendChild(style);
    }
});
