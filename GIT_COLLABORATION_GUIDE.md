# Git Collaboration Guide (You + Friend)

## Repository URL
`https://github.com/Aniketan01/PlotProof.git`

## Step 1: Rename Repository on GitHub
1. Open: [https://github.com/Aniketan01/Land-Ownership-Transfer/settings](https://github.com/Aniketan01/Land-Ownership-Transfer/settings)
2. Under **Repository name**, change `Land-Ownership-Transfer` to `PlotProof`.
3. Click **Rename**.

## Step 2: Update Local Remote URL
In terminal:
```bash
git remote set-url origin https://github.com/Aniketan01/PlotProof.git
git push -u origin main
```

## Step 3: Add Friend as Collaborator
1. Open: [https://github.com/Aniketan01/PlotProof/settings/access](https://github.com/Aniketan01/PlotProof/settings/access)
2. Click **Add people**.
3. Type friend's GitHub username/email and invite.

## Step 4: Friend Clones Repo
On friend's machine:
```bash
git clone https://github.com/Aniketan01/PlotProof.git
cd PlotProof
npm install
npm run dev
```

## Step 5: Golden Rule to Prevent Conflicts
Never both edit `main` branch directly.

### When Friend starts a task:
```bash
git checkout main
git pull origin main
git checkout -b feature/friend-task
```

### When Friend finishes:
```bash
git add .
git commit -m "Add feature XYZ"
git push origin feature/friend-task
```
Then create Pull Request on GitHub and merge into `main`.

### When You want latest changes:
```bash
git checkout main
git pull origin main
```
