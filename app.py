import gradio as gr
import antigravity

def run_agent(user_input):
    return antigravity.run(user_input)

gr.Interface(
    fn=run_agent,
    inputs=gr.Textbox(placeholder="Ask the AMCET AI Agent"),
    outputs="text",
    title="AMCET AI Agent",
    description="AI Agent built using Antigravity"
).launch()
