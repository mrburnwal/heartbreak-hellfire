from flask import Flask, render_template, request, session, redirect, url_for, jsonify
import os

app = Flask(__name__)
app.secret_key = 'ashes-of-us-secret-key'

# Store messages in memory for simplicity (resets on restart)
# In a real scenario, could use session, but memory is fine for a single instance void.
chat_void = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/enter', methods=['POST'])
def enter():
    user_name = request.form.get('user_name', 'You')
    ex_name = request.form.get('ex_name', 'Them')
    
    session['user_name'] = user_name
    session['ex_name'] = ex_name
    session['room_id'] = os.urandom(8).hex()
    
    chat_void[session['room_id']] = []
    
    return redirect(url_for('room'))

@app.route('/room')
def room():
    if 'room_id' not in session:
        return redirect(url_for('index'))
    return render_template('room.html', 
                           user_name=session.get('user_name'),
                           ex_name=session.get('ex_name'))

@app.route('/api/messages', methods=['GET', 'POST'])
def messages():
    if 'room_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    room_id = session['room_id']
    
    if request.method == 'POST':
        data = request.json
        if 'text' in data:
            chat_void[room_id].append({
                'type': 'text',
                'content': data['text']
            })
        elif 'image' in data:
            chat_void[room_id].append({
                'type': 'image',
                'content': data['image']
            })
        elif 'audio' in data:
            chat_void[room_id].append({
                'type': 'audio',
                'content': data['audio']
            })
            
        return jsonify({'status': 'success'})
        
    return jsonify({'messages': chat_void.get(room_id, [])})

@app.route('/api/burn', methods=['POST'])
def burn():
    if 'room_id' in session:
        room_id = session['room_id']
        if room_id in chat_void:
            del chat_void[room_id]
        session.clear()
    return jsonify({'status': 'burned'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
