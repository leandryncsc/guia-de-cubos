<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Do not re-create the removed Android/Capacitor shell unless the owner asks again; the project ships as a web app only.
- If a native shell is added later, keep it outside the web app folder and never commit signing keys or machine-specific SDK paths.
- Keep the tutorial scramble explicit and derive each step's setup from that scramble plus all preceding steps; checkpoint tests protect the continuous solve.
- Reuse CubePlayer for the scramble preview, starting from solved with the same SCRAMBLE used by stepSetup; this keeps preparation and solving illustrations continuous.
