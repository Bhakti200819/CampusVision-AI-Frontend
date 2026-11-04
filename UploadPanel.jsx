function UploadPanel({ handleImage, detectWeapon }) {
  return (
    <div className="upload-panel">

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />

      <button onClick={detectWeapon}>
        🔫 Detect Weapon
      </button>

    </div>
  );
}

export default UploadPanel;